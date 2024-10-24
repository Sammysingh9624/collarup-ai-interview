import classes from "./loader.module.css";
type LoaderProps = {
    className?: string;
};
const Loader: React.FC<LoaderProps> = ({ className }) => {
    return (
        <div className={`py-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className ?? ""} `}>
            <section className={classes["dots-container"]}>
                <div className={classes["dot"]}></div>
                <div className={classes["dot"]}></div>
                <div className={classes["dot"]}></div>
            </section>
        </div>
    );
};

export default Loader;
