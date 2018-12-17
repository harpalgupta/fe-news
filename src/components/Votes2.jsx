import React from "react";

const Votes2 = () => {
  state = { voteChange: 0 };
  return (
    <div>
      <button disabled={this.state.voteChange !== 1 ? 0 : 1}> but</button>
    </div>
  );
};

export default Votes2;
