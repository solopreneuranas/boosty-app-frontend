import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Loader } from '@progress/kendo-react-indicators';
import { Label } from '@progress/kendo-react-labels';
import { DropDownList } from '@progress/kendo-react-dropdowns';
const editorId = 'changeAnimation';
const types = ['pulsing', 'infinite-spinner', 'converging-spinner'];


export default function LoadingPage () {
  const [type, setType] = React.useState('pulsing');
  return <div className="example">
      <div className="example-wrap">
        <div style={{
        width: '50%'
      }}>
          <Label editorId={editorId}>
            Pick the animation:&nbsp;
          </Label>
          <DropDownList id={editorId} value={type} data={types} onChange={e => setType(e.value)} />
        </div>
        <br />
        <div className='row' style={{
        width: '50%'
      }}>
          <div className='col-4'>
            <Loader size='small' type={type} />
          </div>
          <div className='col-4'>
            <Loader type={type} />
          </div>
          <div className='col-4'>
            <Loader size='large' type={type} />
          </div>
        </div>
      </div>
    </div>;
};


// ReactDOM.render(<App />, document.querySelector('my-app'));