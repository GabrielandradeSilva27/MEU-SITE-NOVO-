import AVFoundation
import AppKit
// enc OUT.mp4 --w 1280 --kbps 2500 [--audio] [--fps 30] [--poster out.jpg@sec] --seg FILE@START@DUR [--seg ...]
// DUR 0 = to end. Output size follows first segment's orientation, scaled to width W.
var args = Array(CommandLine.arguments.dropFirst()); let out = args.removeFirst()
var W = 1280, kbps = 2500, audio = false, fps: Int32 = 30; var segs: [(String, Double, Double)] = []
var posterPath: String? = nil; var posterAt = 0.0
var i = 0
while i < args.count { let a = args[i]
  switch a {
  case "--w": W = Int(args[i+1])!; i += 2
  case "--kbps": kbps = Int(args[i+1])!; i += 2
  case "--fps": fps = Int32(args[i+1])!; i += 2
  case "--audio": audio = true; i += 1
  case "--poster": let p = args[i+1].components(separatedBy: "@"); posterPath = p[0]; posterAt = Double(p[1])!; i += 2
  case "--seg": let p = args[i+1].components(separatedBy: "@"); segs.append((p[0], Double(p[1])!, Double(p[2])!)); i += 2
  default: fatalError("bad arg \(a)") }
}
func oriented(_ t: AVAssetTrack) -> CGSize { let r = CGRect(origin: .zero, size: t.naturalSize).applying(t.preferredTransform); return CGSize(width: abs(r.width), height: abs(r.height)) }
let comp = AVMutableComposition()
let vTrack = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
let aTrack = audio ? comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) : nil
var renderSize = CGSize.zero; var instructions: [AVMutableVideoCompositionInstruction] = []
var cursor = CMTime.zero
for (k, s) in segs.enumerated() {
  let asset = AVURLAsset(url: URL(fileURLWithPath: s.0), options: [AVURLAssetPreferPreciseDurationAndTimingKey: true])
  guard let src = asset.tracks(withMediaType: .video).first else { fatalError("no video \(s.0)") }
  let total = CMTimeGetSeconds(asset.duration)
  let dur = s.2 > 0 ? min(s.2, total - s.1) : total - s.1
  let range = CMTimeRange(start: CMTime(seconds: s.1, preferredTimescale: 600), duration: CMTime(seconds: dur, preferredTimescale: 600))
  try! vTrack.insertTimeRange(range, of: src, at: cursor)
  if let at = aTrack, let sa = asset.tracks(withMediaType: .audio).first { try? at.insertTimeRange(range, of: sa, at: cursor) }
  let osz = oriented(src)
  if k == 0 { let h = Int((Double(W) * osz.height / osz.width) / 2) * 2; renderSize = CGSize(width: W, height: h) }
  // cover-fit into renderSize
  let scale = max(renderSize.width / osz.width, renderSize.height / osz.height)
  var t = src.preferredTransform
  let r = CGRect(origin: .zero, size: src.naturalSize).applying(t); t = t.concatenating(CGAffineTransform(translationX: -r.minX, y: -r.minY))
  t = t.concatenating(CGAffineTransform(scaleX: scale, y: scale))
  t = t.concatenating(CGAffineTransform(translationX: (renderSize.width - osz.width*scale)/2, y: (renderSize.height - osz.height*scale)/2))
  let ins = AVMutableVideoCompositionInstruction(); ins.timeRange = CMTimeRange(start: cursor, duration: range.duration)
  let li = AVMutableVideoCompositionLayerInstruction(assetTrack: vTrack); li.setTransform(t, at: cursor)
  ins.layerInstructions = [li]; instructions.append(ins)
  cursor = cursor + range.duration
}
let vc = AVMutableVideoComposition(); vc.renderSize = renderSize; vc.frameDuration = CMTime(value: 1, timescale: fps); vc.instructions = instructions
let reader = try! AVAssetReader(asset: comp)
let vOut = AVAssetReaderVideoCompositionOutput(videoTracks: [vTrack], videoSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
vOut.videoComposition = vc; reader.add(vOut)
var aOut: AVAssetReaderAudioMixOutput? = nil
if let at = aTrack, !at.segments.isEmpty { let o = AVAssetReaderAudioMixOutput(audioTracks: [at], audioSettings: [AVFormatIDKey: kAudioFormatLinearPCM, AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2]); reader.add(o); aOut = o }
try? FileManager.default.removeItem(atPath: out)
let writer = try! AVAssetWriter(outputURL: URL(fileURLWithPath: out), fileType: .mp4); writer.shouldOptimizeForNetworkUse = true
let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: renderSize.width, AVVideoHeightKey: renderSize.height,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: kbps*1000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel, AVVideoMaxKeyFrameIntervalKey: Int(fps)*2]])
vIn.expectsMediaDataInRealTime = false; writer.add(vIn)
var aIn: AVAssetWriterInput? = nil
if aOut != nil { let x = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 48000, AVNumberOfChannelsKey: 2, AVEncoderBitRateKey: 128000]); writer.add(x); aIn = x }
reader.startReading(); writer.startWriting(); writer.startSession(atSourceTime: .zero)
let g = DispatchGroup()
func pump(_ input: AVAssetWriterInput, _ output: AVAssetReaderOutput, _ q: String) {
  g.enter(); input.requestMediaDataWhenReady(on: DispatchQueue(label: q)) {
    while input.isReadyForMoreMediaData { if let b = output.copyNextSampleBuffer() { input.append(b) } else { input.markAsFinished(); g.leave(); return } } } }
pump(vIn, vOut, "v"); if let a = aIn, let o = aOut { pump(a, o, "a") }
g.wait(); let sem = DispatchSemaphore(value: 0); writer.finishWriting { sem.signal() }; sem.wait()
if writer.status != .completed { print("FAILED", writer.error ?? "", reader.error ?? ""); exit(1) }
if let pp = posterPath {
  let gen = AVAssetImageGenerator(asset: AVURLAsset(url: URL(fileURLWithPath: out))); gen.maximumSize = renderSize
  gen.requestedTimeToleranceBefore = .zero; gen.requestedTimeToleranceAfter = .zero
  let cg = try! gen.copyCGImage(at: CMTime(seconds: posterAt, preferredTimescale: 600), actualTime: nil)
  let rep = NSBitmapImageRep(cgImage: cg); try! rep.representation(using: .jpeg, properties: [.compressionFactor: 0.72])!.write(to: URL(fileURLWithPath: pp))
}
let sz = (try? FileManager.default.attributesOfItem(atPath: out)[.size] as? Int) ?? 0
print("OK \(out) \(Int(renderSize.width))x\(Int(renderSize.height)) \(String(format: "%.1f", CMTimeGetSeconds(cursor)))s \(sz/1024)KB")
