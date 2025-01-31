import { ThreeDots } from "react-loader-spinner"

const PageLoader = () =>{
    return(
        <div className="w-screen h-screen flex items-center justify-center">
                <ThreeDots
                    height="100" 
                    width="100"
                    radius="5"
                    color="#00008B" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                >

                </ThreeDots>
        </div>
    )
}
export default PageLoader