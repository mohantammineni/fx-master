import React from "react";
import PropTypes from "prop-types";
const Message = ({ notification }) => {
  Message.propTypes={
    notification: PropTypes.any
  }
    return (
      <>
        <div id="notificationHeader">
          {/* image is optional */}
          {notification.image && (
            <div id="imageContainer">
              <img src={notification.image} width={100} />
            </div>
          )}
          <span>{notification.title}</span>
        </div>
        <div id="notificationBody">{notification.body}</div>
      </>
    );
  };
  
  export default Message;
  