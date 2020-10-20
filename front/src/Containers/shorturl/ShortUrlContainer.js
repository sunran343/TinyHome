import React from "react";
import {connect} from "react-redux";
import {ShortUrl} from "../../Components/shorturl/ShortUrl";

function ShortUrlContainer(props){
    return(
        <ShortUrl/>
    )
}
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(
    mapStateToProps, mapDispatchToProps
)(ShortUrlContainer);
