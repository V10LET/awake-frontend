import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, createStyles } from '@material-ui/core/styles'

import ViewLog from '../components/ViewLog'
import ViewMed from '../components/ViewMed'

import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'
import Switch from '@material-ui/core/Switch'

const styles = theme => createStyles({
    allLogs: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
        margin: '40px 0px'
    },
    inputBar: {
        width: '40%',
        marginLeft: 10
    },
    switchRow: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center'
    },
})

class ViewLogs extends Component {

    state = {
        searchTerm: '',
        meditation: false
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value })
    }

    handleSearch = (user) => {
        const { searchTerm, meditation } = this.state
        if (user.logs) {
            if (meditation) {
                return user.timed_logs.filter(l=> {
                    return l.time.includes(searchTerm)
                })
            } else {
                return user.logs.filter(l=> {
                    return l.mentalNote.includes(searchTerm) ||
                    l.emotionalNote.includes(searchTerm) ||
                    l.physicalNote.includes(searchTerm) ||
                    l.spiritualNote.includes(searchTerm)
                })
            }
        }
    }

    handleChange = () => this.setState({ meditation: !this.state.meditation })

    render() {
        const { user, classes } = this.props
        const { meditation } = this.state
        const logs = this.handleSearch(user)
        return (
            <div className={classes.allLogs}>
                <div className={classes.searchContainer}>
                    <SearchIcon />
                    <Input type="search" className={classes.inputBar} onChange={this.handleChange}/>
                </div>

                <div className={classes.switchRow}>
                    <div style={meditation ? {color: 'rgba(0,0,0,.3)'} : null}>Written</div>
                        <Switch checked={meditation} onChange={this.handleChange}/>
                    <div style={meditation ? null : {color: 'rgba(0,0,0,.3)'}}>Meditation</div>
                </div>

                <div className='logs-container'>
                    {logs.slice().reverse().map(log=> {
                        if (!meditation) {
                            return <div key={log.id} style={{ margin: 20 }}><ViewLog log={log} /></div>
                        } else {
                            return <div key={log.id} style={{ margin: 20 }}><ViewMed log={log}/></div>
                        }

                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps ~>', state)
    return { user: state.user.user }
}
export default connect(mapStateToProps)(withStyles(styles)(ViewLogs))
