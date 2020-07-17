import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { deleteCocktail } from '../../Actions/dataActions'
import { connect } from 'react-redux'
import { Message, Button, Icon } from 'semantic-ui-react'
import './DataOpButtons.scss'

const DataOpButtons = ({ table, data, deletingData, deleteCocktail }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { push, goBack } = useHistory();

    const handleDelete = async () => {
        await deleteCocktail(table, data.id);
        goBack();
    }

    return (
        <div className="DataOpButtons">
            {(data.same_user && !confirmDelete) && 
            <Message className="operation-buttons">
                <div>
                    <Button
                        fluid
                        icon
                        labelPosition="left"
                        color="red"
                        onClick={() => setConfirmDelete(true)}
                    >
                        Delete
                        <Icon name="delete" />
                    </Button>
                </div>
                <div>
                    <Button 
                        fluid
                        icon
                        labelPosition="left"
                        onClick={() => push(`${data.id}/edit`)}
                    >
                        Edit
                        <Icon name="pencil" />
                    </Button>
                </div>
            </Message>}
            {confirmDelete &&
            <Message error className="confirm-delete">
                <Message.Header>Are you sure you want to delete "{data.name}?"</Message.Header>
                <div className="operation-buttons">
                    <div>
                        <Button 
                            fluid
                            color="red"
                            onClick={handleDelete}
                            disabled={deletingData}
                            loading={deletingData}
                        >
                            Yes
                        </Button>
                    </div>
                    <div>
                        <Button
                            fluid
                            onClick={() => setConfirmDelete(false)}
                            disabled={deletingData}
                        >
                            No
                        </Button>
                    </div>
                </div>
            </Message>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        deletingData: state.dataReducer.deletingData,
        deleteSuccess: state.dataReducer.deleteSuccess,
        deleteError: state.dataReducer.deleteError
    }
}

export default connect(mapStateToProps, { deleteCocktail })(DataOpButtons)