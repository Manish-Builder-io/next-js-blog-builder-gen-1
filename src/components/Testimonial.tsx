interface Author {
    fullName: string
    authorImage: string
  }
  
  interface TestimonialProps {
    text: string
    author: {
      value: {
        data: Author
      }
    }
    locale: string
  }
  
  const Testimonial: React.FC<TestimonialProps> = ({ text, author }) => {
  
  
    return (
      <div className="testimonial">
        <p className="testimonial-text">{text}</p>
        <div className="author-info">
          <img
            src={author?.value?.data?.authorImage}
            alt={author?.value?.data?.fullName}
            style={{ maxWidth: '160px' }}
            className="author-image"
          />
          <p className="author-name">{author?.value?.data?.fullName}</p>
        </div>
      </div>
    )
  }

  export default Testimonial;