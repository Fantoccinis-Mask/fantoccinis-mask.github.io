namespace("fm.poc.ProofOfConcept", {}, () => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bodyType: "woman"
      };
    }
    afterRender() {
      
    }
    render() {
      return (<>
        { this.state.metadata && (<>
        </>)}
      </>);
    }
  };
});