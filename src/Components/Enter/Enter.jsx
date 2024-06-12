import PropTypes from 'prop-types';
import { Letter } from '../Letter/Letter';
import styles from './Enter.module.scss'

export const Enter = ({letters}) => {
    return <div className={styles.enterContainer}>
        {letters.map((item, index) => <Letter className={styles.enterLetter} letter={item} key={index}/>)}
    </div>
}

Enter.propTypes = {
    letters: PropTypes.array
}