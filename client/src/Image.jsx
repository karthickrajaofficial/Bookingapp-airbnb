export default function Image({ src, ...rest }) {
  let imageUrl;

  if (src && src.startsWith('s3://')) {
    // Handle S3 URL
    imageUrl = src.replace('s3://', 'https://your-s3-bucket-name.s3.amazonaws.com/');
  } else {
    // Assuming it's a relative path
    imageUrl = 'http://localhost:4000/uploads/' + src;
  }

  return <img {...rest} src={imageUrl} alt={''} />;
}
