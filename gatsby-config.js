module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteURL: 'http://amine-bouneggar.com',
    siteTitle: 'Amine Bouneggar',
    siteDescription:
      'I’m Amine, a 22 year-old French digital designer and freelancer based in Paris.',
    socialNetworks: [
      { name: 'Linkedin', href: 'https://www.linkedin.com/in/aminebouneggar' },
      { name: 'Behance', href: 'https://www.behance.net/thefrenchdesigner' },
      { name: 'Mail', href: 'mailto:amine.bouneggar7@gmail.com' }
    ]
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-preact',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Amine Bouneggar',
        short_name: 'AB',
        start_url: '/',
        background_color: '#000',
        theme_color: '#787878',
        display: 'minimal-ui'
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-97921982-1'
      }
    }
  ]
}
