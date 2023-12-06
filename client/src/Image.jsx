export default function Image({ src, ...rest }) {
    const baseUrl =  'https://karthick-bookingapp-airbnb.vercel.app';
    const imageUrl = src && src.includes('http') ? src : baseUrl + 'uploads/' + src;
  
    return <img {...rest} src={imageUrl} alt={''} />;
  }
  
