import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function Basic(props) {

  return <MDBDataTableV5 hover entriesOptions={[10, 20, 25]} entries={20} pagesAmount={4} data={props.datatable} />;
}