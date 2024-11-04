import classes from './loader.module.css';

const AiLoader = () => {
    return (
        <section className={classes['dots-container']}>
            <div className={classes['dot']}></div>
            <div className={classes['dot']}></div>
            <div className={classes['dot']}></div>
        </section>
    );
};

export default AiLoader;
