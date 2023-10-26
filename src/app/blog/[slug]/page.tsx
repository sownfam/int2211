export default async function BlogContent() {
  //TODO: Props 'html content' here!
  const value = '<h1><span style="color: #15d198"><strong>Haloo</strong></span></h1><p><span style="color: #15d198"><strong>Welcome</strong></span></p><p style="text-align: center"><span style="color: #276854">My name is Son</span></p>';
  return (
    <div dangerouslySetInnerHTML={{__html: value}}>
    </div>
  )
}
