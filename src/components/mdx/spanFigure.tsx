type SpanFigureProps = {
  htmlString: string
}

export const SpanFigure = ({ htmlString }: SpanFigureProps) => {
  return (
    <span
      sx={{
        figure: {
          variant: 'figures.figure',
          img: { variant: 'cards.image' },
          figcaption: { variant: 'figures.figcaption' },
        },
      }}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  )
}
