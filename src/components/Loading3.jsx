import ReactLoading from 'react-loading';

const Loading3 = () => {
 

  return (
   <div className='tw-text-center tw-flex tw-flex-row tw-justify-center tw-align-middle'> 
    <ReactLoading type={"spin"} color={"black"} height={"20px"} width={"20px"} />
   </div>
  );
};

export default Loading3;