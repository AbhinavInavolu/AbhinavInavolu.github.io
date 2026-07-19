import PropTypes from "prop-types";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
                    rel="stylesheet"
                />

                <link rel="stylesheet" href="./styles.css" />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
                <script src="./scripts.js" defer></script>
                <title>Abhinav Inavolu</title>
            </head>

            <body>{children}</body>
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
