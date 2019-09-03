import React, {Component} from 'react';
import Files from "react-files";
import {connect} from 'react-redux';

import {setJsonTable, changeTableValue, getStoreTableData, delObjInStore, downObjInStore, upObjInStore, addNewObj} from "./actions/action";
import saveJsonHelper from './helpers/saveJsonHelper';
import idGeneratorHelper from './helpers/idGeneratorHelper';
import './App.css';


class App extends Component {

	constructor(props) {
		super(props);

		this.fileReader = new FileReader();

		this.fileReader.onload = event => {
			const uploadingJson = JSON.parse(event.target.result).map((obj, index) => {
				obj['id'] = idGeneratorHelper();
				return obj
			})

			this.props.setJsonTableAction(uploadingJson)
		};
	}

	handleInputChange = event => {
		event.preventDefault();
        this.props.changeTableValueAction(event.target.name, event.target.value)
	}

	handleGetStore = event => {
		event.preventDefault();

		this.props.getStoreTableDataAction();
	}

	handleDelObj = event => {
		event.preventDefault();
		let myPerent = event.target.closest('tr'); //find class name of perent in table
		this.props.delObjInStoreAction(myPerent.className.replace(/\D+/g,""));
	}

	handleUpObj = event => {
		event.preventDefault();

		let myPerent = event.target.closest('tr');
		this.props.upObjInStoreAction(myPerent.className.replace(/\D+/g,""))

	}

	handleDownObj = event => {
		event.preventDefault();

		let myPerent = event.target.closest('tr');
		this.props.downObjInStoreAction(myPerent.className.replace(/\D+/g,""))

	}

	handleAddObj = event => {
		event.preventDefault();

		this.props.addNewObjAction();
	}

	render(){


		const {tableData} = this.props;	
		localStorage.setItem("tableJson", JSON.stringify(tableData));

		const renderTableData = (tableData.length !== 0)?tableData.map((itemObj, index) =>{
			
			return(
				<tr key={itemObj.id} className={"indexInTable"+index}>
					<td>
						<input className="text-center" 
							name={"name" + index}
							type='text' 
							defaultValue={itemObj.name}
							onChange={this.handleInputChange}>
						</input>
					</td>
					<td>
						<input className="text-center" 
							name={"value" + index}
							type='text'
							defaultValue={itemObj.value}
							onChange={this.handleInputChange}>
						</input>
					</td>
					<td onClick={this.handleUpObj} style={{cursor:'pointer'}}>
						<i className="fas fa-chevron-up"></i>
					</td>
					<td onClick={this.handleDownObj} style={{cursor:'pointer'}}>
						<i className="fas fa-chevron-down"></i>
					</td>
					<td onClick={this.handleDelObj} style={{cursor:'pointer'}}>
						<i className="fas fa-times"></i>
					</td>
				</tr>
			)
		})
		:null;

		return (
			<div className="container">
				  <Files
					className="files-loader bg-secondary text-light"
					onChange={file => {
						this.fileReader.readAsText(file[0]);
					}}
					onError={err => console.log(err)}
					accepts={[".json"]}
					multiple
					maxFiles={3}
					maxFileSize={10000000}
					minFileSize={0}
					clickable
				>Click or drag file here for load .json</Files>
				<table className="table text-center bg-white">
					<thead className="bg-primary">
						<tr className="text-light">
							<th scope="col">Name</th>
							<th scope="col">Value</th>
							<th scope="col" colSpan="3"><button type="button" className="savejson btn btn-success" onClick={()=>saveJsonHelper(tableData)}>Save file(.json)</button></th>
						</tr>
					</thead>
					<tbody className="text-center">
						{renderTableData}
					</tbody>
				</table>
				<div className='d-flex justify-content-between'>
				<button type="button" className="btn btn-primary" onClick={this.handleAddObj}>Add a new note</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = function (store) {
    return {
		tableData:store.tableData.data,
    }

};
const mapDispatchToProps = function (dispatch) {
    return {
		setJsonTableAction:(dataJson) => dispatch(setJsonTable(dataJson)),
		changeTableValueAction:(name, value) => dispatch(changeTableValue(name, value)),
		getStoreTableDataAction:() => dispatch(getStoreTableData()),
		delObjInStoreAction:(index) => dispatch(delObjInStore(index)),
		upObjInStoreAction:(index) => dispatch(upObjInStore(index)),
		downObjInStoreAction:(index) => dispatch(downObjInStore(index)),
		addNewObjAction:() => dispatch(addNewObj()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
