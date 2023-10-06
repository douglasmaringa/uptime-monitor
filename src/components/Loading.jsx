import ReactLoading from 'react-loading';

const Loading = () => {
 

  return (
   <div className='tw-text-center tw-flex tw-flex-row tw-justify-center tw-align-middle'> 
    <ReactLoading type={"spin"} color={"white"} height={"20px"} width={"20px"} />
   </div>
  );
};

export default Loading;