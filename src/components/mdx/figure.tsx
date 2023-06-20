/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Figure(props: any) {
  return (
    <figure
      {...props}
      sx={{
        img: { variant: 'cards.image' },
        variant: 'figures.figure',
      }}
    />
  )
}

export function FigCaption(props: any) {
  return <figcaption {...props} sx={{ variant: 'figures.figcaption' }} />
}
