import { CircularProgressbar } from 'react-circular-progressbar';
import COLORS from '../../utils/colors';

const ProgressBar = () => (
    <CircularProgressbar
        background
        value={66}
        text={"66%"}
        styles={{
            // Customize the root svg element
            root: {},
            // Customize the path, i.e. the "completed progress"
            path: {
            // Path color
            stroke: `${COLORS.RED}`,
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
            // Trail color
            stroke: 'transparent',
            },
            // Customize the text
            text: {
            // Text color
            fill: `${COLORS.RED}`,
            // Text size
            fontSize: '16px',
            fontWeight:  "bold",
            color: `${COLORS.RED}`,
            },
            // Customize background - only used when the `background` prop is true
            background: {
            fill: `${COLORS.ORANGE_PROGRESS}`,
            },
        }}
    />
);

export default ProgressBar;