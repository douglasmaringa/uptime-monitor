import ReactLoading from 'react-loading';

const Loading2 = () => {
 

  return (
   <div className='tw-text-center tw-flex tw-flex-row tw-justify-center tw-align-middle'> 
    <ReactLoading type={"spin"} color={"black"} height={"40px"} width={"40px"} />
   </div>
  );
};

export default Loading2;