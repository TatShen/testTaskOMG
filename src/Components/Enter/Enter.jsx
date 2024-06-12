import PropTypes from 'prop-types';
import { Letter } from '../Letter/Letter';
import styles from './Enter.module.scss'
import EnterStore from '../../Store/EnterStore';
import { useStore } from 'zustand';

export const Enter = () => {
    const {enter} = useStore(EnterStore);
    return <div className={styles.enterContainer}>
        {enter.map((item, index) => <Letter className={styles.enterLetter} letter={item} key={index}/>)}
    </div>
}

Enter.propTypes = {
    letters: PropTypes.array
}