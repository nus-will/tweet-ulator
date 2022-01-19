import * as React from 'react';

type Props = {
  currentUser: string;
  onPostMessage: (postMessage: string) => void;
};

export const MessagePost: React.FC<Props> = props => {
  const { currentUser, onPostMessage } = props;
  const [postMessage, setPostMessage] = React.useState('');

  const handleSubmit = () => {
    onPostMessage(postMessage);
  };

  return (
    <>
      <h3 className="mt-5">Post new message:</h3>
      <form className="row row-cols-lg-auto g-3 align-items-center">
        <div className="col-12">
          <label className="visually-hidden" htmlFor="inlineFormInputGroupMessage">Message</label>
          <div className="input-group">
            <input type="number" className="form-control" id="inlineFormInputGroupMessage" placeholder="Message" onChange={(e) => setPostMessage(e.target.value)}/>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={(e) => {e.preventDefault(); handleSubmit()}}>Submit</button>
        </div>
      </form>
    </>
  );
};