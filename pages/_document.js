import Document, { Head, Main, NextScript } from 'next/document';
import { getServerSideToken, getUserScript } from '../lib/auth'

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        console.log('ctx', ctx)
        const props = await Document.getInitialProps(ctx);
        const userData = await getServerSideToken(ctx.req);
        console.log('getInitialProps', props, userData);
        return { ...props, ...userData }
    }

    render() {
        const { user = {} } = this.props
        console.log("render", user)
        return (
            <html>
                <Head />
                <body>
                    <Main />
                    <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
                    <NextScript />
                </body>
            </html>
        )
    }
}