export const StaticSiteDemo = () => (
  <div
    style={{
      height: '450px',
      width: '100%',
      marginBottom: '20px',
    }}
  >
    <iframe
      src="https://feature-flagging-static-sites.netlify.app/"
      style={{
        height: '100%',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
      title="Feature flagging static sites demo"
    ></iframe>
  </div>
)
