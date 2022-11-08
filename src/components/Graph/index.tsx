import { css } from "@emotion/css";
import COLORS from "../../utils/colors";

const Graph = () => (
    <table>
        <tr>
        <td className={css`padding: 1vh;`}>4</td>
        </tr>
        <tr>
        <td className={css`padding: 1vh;`}>3</td>
        </tr>
        <tr>
        <td className={css`padding: 1vh;`}>2</td>
        </tr>
        <tr>
        <td className={css`padding: 1vh;`}>1</td>
        </tr>
        <tr>
        <td className={css`padding: 1vh;`}>0</td>
        <td className={css`padding: 3vh;`}>
            <label className={css`position: absolute; border-radius: 20px; bottom: 19px; height: 115px; width: 1.62vh; background-color: ${COLORS.RED};`}>.</label>
        </td>
        <td className={css`padding: 3vh;`}>
            <label className={css`position: absolute; border-radius: 20px; bottom: 19px; height: 76px; width: 1.62vh; background-color: ${COLORS.RED_FADED};`}>.</label>
        </td>
        <td className={css`padding: 3vh;`}>
            <label className={css`position: absolute; border-radius: 20px; bottom: 19px; height: 45px; width: 1.62vh; background-color: ${COLORS.RED_FADED};`}>.</label>
        </td>
        <td className={css`padding: 3vh;`}>
            <label className={css`position: absolute; border-radius: 20px; bottom: 19px; height: 110px; width: 1.62vh; background-color: ${COLORS.RED};`}>.</label>
        </td>
        <td className={css`padding: 3vh;`}>
            <label className={css`position: absolute; border-radius: 20px; bottom: 19px; height: 99px; width: 1.62vh; background-color: ${COLORS.RED};`}>.</label>
        </td>
        <td className={css`padding: 3vh;`}>
            <label className={css`position: absolute; border-radius: 20px; bottom: 19px; height: 25px; width: 1.62vh; background-color: ${COLORS.RED_FADED};`}>.</label>
        </td>
        <td className={css`padding: 3vh;`}>
            <label className={css`position: absolute; border-radius: 20px; bottom: 19px; height: 65px; width: 1.62vh; background-color: ${COLORS.RED_FADED};`}>.</label>
        </td>
        </tr>
        <tr>
        <td></td>
        <td className={css`padding-left: 2.44vh;`}>Mon</td>
        <td className={css`padding-left: 2.44vh;`}>Tue</td>
        <td className={css`padding-left: 2.44vh;`}>Wed</td>
        <td className={css`padding-left: 2.44vh;`}>Thu</td>
        <td className={css`padding-left: 2.44vh;`}>Fri</td>
        <td className={css`padding-left: 2.44vh;`}>Sat</td>
        <td className={css`padding-left: 2.44vh;`}>Sun</td>
        </tr>
    </table>
);

export default Graph;