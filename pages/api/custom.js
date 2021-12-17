import BingAPI, { BasePath, getBaseURL } from '../../middleware/BingAPI'

export default Custom

async function Custom ( req, gres ) {
    const url = new URL( req.url )
    const requestMethod = url.searchParams.get( "method" ) ? url.searchParams.get( "method" ) : "default"
    const customIdx = url.searchParams.get( "idx" ) ? url.searchParams.get( "idx" ) : 0
    const imageKey = url.searchParams.get( "key" ) ? url.searchParams.get( "key" ) : "url"
    
    const reqMethod = req.method
    if ( reqMethod === "GET" || reqMethod === "POST" || reqMethod === "HEAD" || reqMethod === "OPTION" ) {
        gres.setHeader( "Access-Allow-Control-Origin", "*" )
        gres.setHeader( "Access-Allow-Max-Age", 600 )
    }
    
    BingAPI.get( BasePath, {
        params: {
            format: "js",
            idx: customIdx,
            n: 1,
            mkt: "zh-CN"
        }
    } )
        .then( res => {
            if ( res.status === 200 ) {
                const fullUrl = getBaseURL() + res.data.images[ 0 ].url
                switch ( requestMethod ) {
                    case "json":
                    case "js":
                        gres.setHeader( "Content-Type", "application/json" )
                        gres.status( 200 ).send( '{"' + imageKey + '":"' + fullUrl + '"}' )
                        break
                    case "plain":
                    case "text":
                        gres.setHeader( "Content-Type", "text/plain" )
                        gres.status( 200 ).send( fullUrl )
                        break
                    case "element":
                        gres.setHeader( "Content-Type", "text/plain" )
                        gres.status( 200 ).send( '<' + imageKey + ' src="' + fullUrl + '"/>' )
                        break
                    default:
                        gres.redirect( 302, "https://cn.bing.com" + res.data.images[ 0 ].url )
                        break
                }
                gres.end()
            } else {
                gres.status( 502 )
                gres.end()
            }
        } )
        .catch( err => {
            console.error( err )
        } )
}