import { css } from "@emotion/css";

const NotFound = () => (
    <div className={ css`display: flex; flex-direction: column; flex: 1; width: 100%; height: 100%; justify-content: center; align-items: center; padding: 0 20px; border-sizing: border-box; background-color: #000` }>
        <div className={css`flex: 1`}>
            <h1 className={css`font-family: inherit; font-weight: 500; line-height: 1.1; color: inherit; font-size: 36px; margin: 60% 0; color: #FFF;`}>Resource not found <small>404</small></h1>
        </div>
        <div className={css`flex: 1`}>
            <p className={css`color: silver; font-size: 21px; line-height: 1.4; font-weight: 300; margin-top: -20%; color: #FFF;`}>The requested resource could not be found but may be available again in the future.</p>
        </div>
    </div>
);

export default NotFound;