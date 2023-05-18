import React from 'react';
import AlertDialog from './AlertDialog';
import FailDialog from './FailDialog';

interface Props {
  context :string,
  fail: boolean
}

export const Dialog = ({context, fail}: Props):any => {

  if (fail===true) {
    return (
      <FailDialog context={context}/>
    )
  }

  return (
    <AlertDialog context={context}/>
  );
};

export default Dialog;
