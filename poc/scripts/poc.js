namespace("fm.poc.ProofOfConcept", {
  'gizmo-atheneum.namespaces.paper-doll.Dataset': 'Dataset',
  "fm.poc.Faces": "Faces",
  "fm.common.ProgressBar": "ProgressBar"
}, ({ Dataset, Faces, ProgressBar }) => {
  const [percentOfScreenWidth, percentOfScreenHeight] = [ 0.2, 0.5];
  const bodyType = "woman";
  const images = {
    mouths: Faces.buildForEachMouth(bodyType),
    symetricalEyes: Faces.buildForAllSymetricalEyes(bodyType),
    mixedEyes: Faces.buildForAllMixedEyes(bodyType)
  }
  console.log({ images });
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { bodyType, images };
    }
    componentDidMount() {
      if (!this.state.metadata) {
        Dataset.load(this.state.bodyType, Faces.version, percentOfScreenWidth, percentOfScreenHeight, (dataset) => {
          this.setState({ metadata: dataset, progress: undefined, selectedLayer: 0});
        }, (resp) => {
          console.log(resp);
          throw resp;
        }, (state) => {
          const progress = (100 * (state.state + 1)) / (state.max + 1);
          this.setState({progress})
        });
      }
    }
    render() {
      if (this.state.progress) {
        return <>
          <ProgressBar subject="display faces" progress={this.state.progress}/>
        </>;
      } else if (this.state.metadata) {
        return (<div className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center"><h2>Mouths</h2></div>
          <div className="d-flex flex-wrap justify-content-center">
            { this.state.images.mouths.map((schematic) => {
              const { width, height, content, viewBox } = this.state.metadata.drawSVG(schematic);
              return <div>
                <svg width={width} height={height} viewBox={viewBox} dangerouslySetInnerHTML={{ __html: content }}></svg>
              </div>
            })}
          </div>
          <div className="d-flex justify-content-center"><h2>Symetrical Eyes</h2></div>
          <div className="d-flex flex-wrap justify-content-center">
            { this.state.images.symetricalEyes.map((schematic) => {
              const { width, height, content, viewBox } = this.state.metadata.drawSVG(schematic);
              return <div>
                <svg width={width} height={height} viewBox={viewBox} dangerouslySetInnerHTML={{ __html: content }}></svg>
              </div>
            })}
          </div>
          <div className="d-flex justify-content-center"><h2>Mixed Eyes</h2></div>
          <div className="d-flex flex-wrap justify-content-center">
            { this.state.images.mixedEyes.map((schematic) => {
              const { width, height, content, viewBox } = this.state.metadata.drawSVG(schematic);
              return <div>
                <svg width={width} height={height} viewBox={viewBox} dangerouslySetInnerHTML={{ __html: content }}></svg>
              </div> 
            })}
          </div>
        </div>)
      }
    }
  };
});