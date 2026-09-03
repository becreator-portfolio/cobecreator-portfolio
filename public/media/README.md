# Media handoff

Arquivos esperados pela implementação atual:

- `hero.mp4`
- `hero-poster.jpg`
- `block-office.mp4`
- `block-office-poster.jpg`
- `nos-contra-o-mundo.mp4`
- `nos-contra-o-mundo-poster.jpg`
- `peso-da-historia.mp4`
- `peso-da-historia-poster.jpg`

## Regras de exportação

- Vídeos de preview: sem áudio obrigatório, H.264/MP4, `faststart`, bitrate controlado e dimensões coerentes com o crop aprovado no Figma.
- Posters: usar o mesmo enquadramento do primeiro frame aprovado para evitar flash preto e mudança de composição no carregamento.
- Hero e cards usam `object-fit: cover`.
- Project View usa mídia preservando o conteúdo do filme e pode receber `object-position` específico em `data/projects.ts`.
- Não adicionar versões desktop/mobile duplicadas da mesma mídia sem necessidade; a página usa uma única árvore responsiva.

Os demais visuais das seções Processo, Experimentos e Abordagem ainda estão como placeholders de layout até os assets finais serem adicionados.
