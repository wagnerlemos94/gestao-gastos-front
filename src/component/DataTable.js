import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function Basic(props) {

  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={props.datatable} />;
}