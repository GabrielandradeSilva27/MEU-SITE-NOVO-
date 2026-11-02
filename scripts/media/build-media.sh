#!/bin/bash
# Gera os vídeos otimizados do site a partir dos arquivos brutos desta pasta.
# Requer macOS (usa AVFoundation, sem ffmpeg). Uso: bash scripts/media/build-media.sh
set -e
cd "$(dirname "$0")/../.."
ENC=.media-cache/encode
mkdir -p .media-cache
[ -x $ENC ] || swiftc -O scripts/media/encode.swift -o $ENC
M=public/media

# Loop sem áudio:  loop SAÍDA LARGURA KBPS ARQUIVO INÍCIO DURAÇÃO
loop() { $ENC "$M/$1.mp4" --w $2 --kbps $3 --fps 25 --poster "$M/$1.jpg@0.4" --seg "$4@$5@$6"; }
# Vídeo completo com áudio para o player:  full SAÍDA LARGURA ARQUIVO
full() { $ENC "$M/$1-full.mp4" --w $2 --kbps 2200 --fps 30 --audio --seg "$3@0@0"; }

# HERO — reel horizontal
$ENC $M/hero/reel.mp4 --w 1600 --kbps 2400 --fps 25 --poster "$M/hero/reel.jpg@0.6" \
  --seg "_gabriel.rec (1).mp4@127@2.6" \
  --seg "CRISTIANE - ANI 50 ANOS - FINAL .mov@112.5@2.6" \
  --seg "_gabriel.rec (1).mp4@71.8@2.6" \
  --seg "VARGAS - VIDEO INSTITUCIONAL - LEGENDAS  - final - v2.mov@63.4@2.6" \
  --seg "CRISTIANE - ANI 50 ANOS - FINAL .mov@95@2.4" \
  --seg "V2 - FINAL - MOMENTO AGAPE - SETEMBRO (LEGENDAS)alt.mp4@56@2.6" \
  --seg "CRISTIANE - ANI 50 ANOS - FINAL .mov@124@2.4" \
  --seg "CRISTIANE - ANI 50 ANOS - FINAL .mov@192.5@3.6"

# MANIFESTO e PROCESSO — faixas horizontais
loop manifesto/aerial 1280 1600 "CRISTIANE - ANI 50 ANOS - FINAL .mov" 190 8
loop process/room 1280 1400 "_gabriel.rec (1).mp4" 126.5 8

# PILARES — verticais
loop pillars/performance 540 1300 "academiabrumfit 2.mp4" 40 6
loop pillars/real-time 540 1300 "Evento - GIGANTES - ALLIS - 1 - V2.mov" 14 6
loop pillars/positioning 540 1300 "APARTAMENTO DE LUXO  - FINAL - V4.mov" 1.5 6

# NÚMEROS — verticais
loop stats/festival 540 1300 "marcusbatistacozivip.mp4" 2 6
loop stats/street 540 1300 "yellowlivemkt.mp4" 1 6

# TRABALHOS — prévia (loop) + versão completa
work() { loop works/$1 $2 1300 "$3" $4 6; full works/$1 $5 "$3"; }
work convencao 960 "V2 - FINAL - MOMENTO AGAPE - SETEMBRO (LEGENDAS)alt.mp4" 13 1280
work lancamento 960 "VARGAS - VIDEO INSTITUCIONAL - LEGENDAS  - final - v2.mov" 72 1280
work celebracao 960 "CRISTIANE - ANI 50 ANOS - FINAL .mov" 113 1280
work dia-dos-pais 960 "ÁGAPE - DIA DOS PAIS (leg).mp4" 44 1280
work clinica 540 "ALLIS - INSTITUCIONAL.mp4" 20 720
work mansao 540 "FINAL - MANSÃO - GUARAPARI - SHOPPING  DO IMOVEL .mov" 38 720
work tecnologia 540 "NPC VIDEO FINAL - v2.mov" 2 720
work coworking 540 "SPACE22 - SALA 1 - FINAL .mov" 25 720
work evento 540 "Evento - GIGANTES - ALLIS - 2 - v2.mov" 10 720
work consultorio 540 "DR IGOR - NOVO ENDEREÇO - FINAL.mov" 12 720
work bairro 540 "BRENDA - ARBORI.mp4" 14 720
