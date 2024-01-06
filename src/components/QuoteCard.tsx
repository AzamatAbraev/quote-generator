
const QuoteCard = (props: { description: string, title: string, image: string }) => {
  return (
    <div>
      <img src={props.image} alt={props.description} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  )
}

export default QuoteCard