export default function Image({ src, ...rest }) {
    const baseUrl =  'http://localhost:4000/';
    const imageUrl = src && src.includes('http') ? src : baseUrl + 'uploads/' + src;
  
    return <img {...rest} src={imageUrl} alt={''} />;
  }
  