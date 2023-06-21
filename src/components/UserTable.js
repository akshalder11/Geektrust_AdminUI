import React, { useRef } from 'react';
import './UserTable.css';

const UserTable = (props) => {
    const { dataRow, deleteRow, selectStatus, editToggleHandler, saveToggleHandler } = props;

    const name = useRef();
    const email = useRef();
    const role = useRef();

    return (
        <tr className={dataRow.isSelected ? "rowSelected" : ""}>
            <td><input type="checkbox" className="customCheckbox" name="" id={dataRow.id} key={dataRow.id} onChange={() => selectStatus(dataRow.id)} checked={dataRow.isSelected} /></td>
            <td className={dataRow.editToggle ? "rowSelected" : ""}>
                <input className={dataRow.editToggle ? 'editEnabled' : 'editDisabled'} readOnly={dataRow.editToggle ? false : true}
                    type="text"
                    name="name"
                    defaultValue={dataRow.name}
                    ref={name}
                />
            </td>

            <td className={dataRow.editToggle ? "rowSelected" : ""}>
                <input className={dataRow.editToggle ? 'editEnabled' : 'editDisabled'} readOnly={dataRow.editToggle ? false : true}
                    type="email"
                    name="email"
                    defaultValue={dataRow.email}
                    ref={email}
                />
            </td>

            <td className={dataRow.editToggle ? "rowSelected" : ""}>
                <input className={dataRow.editToggle ? 'editEnabled' : 'editDisabled'} readOnly={dataRow.editToggle ? false : true}
                    type="text"
                    name="role"
                    defaultValue={dataRow.role}
                    ref={role}
                />
            </td>

            {/* <td>{dataRow.name}</td>
            <td>{dataRow.email}</td>
            <td>{dataRow.role}</td> */}
            <td className='iconColumn'>
                {dataRow.editToggle ? (<div className='actionBtn'>
                    <i className="icon ion-ios-save icons" onClick={() => saveToggleHandler(dataRow.id, name, email, role)}></i>
                </div>
                ) : (<div className='actionBtn'>
                    <i className="icon ion-md-create icons" onClick={() => editToggleHandler(dataRow.id)}></i>
                </div>
                )}
                <div className='actionBtn'>
                    <i className="icon ion-md-trash icons" onClick={() => deleteRow(dataRow.id)}></i>
                </div>
            </td>
        </tr>
    )

}

export default UserTable;