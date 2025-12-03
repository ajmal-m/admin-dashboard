import { ProgressBar } from 'react-loader-spinner'
const Loader = () => {
    return(
        <div className='flex items-center justify-center min-h-screen bg-[#0B6434]'>
            <ProgressBar
                visible={true}
                height="100"
                width="300"
                color="##fcffff"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                barColor='white'
                borderColor='white'
            />
        </div>
    )
};

export default Loader;