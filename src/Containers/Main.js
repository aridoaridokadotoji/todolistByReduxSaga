import React, { Component } from 'react'
import { ListView, View, Keyboard } from 'react-native'
import Header from '../Components/Header'
import Row from '../Components/Row'
import { connect } from 'react-redux'
import {
  updateTask,
  saveTask,
  fetchTaskList,
  toggleCompleteStatus,
  deleteTask
} from '../Actions/Actions'

class Main extends Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    }
  }

  componentWillMount () {
    this.props.fetchTaskList()
  }

  componentWillReceiveProps (nextProps) {
    console.log('RECEIVING PROPS', nextProps)
    const { render, tasks } = nextProps
    if (render) {
      this.setSource(nextProps.tasks, nextProps.tasks)
    }
  }

  setSource (items, itemDataSource) {
    console.log('Setting data source')
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemDataSource)
    })
  }

  handleAddingTask () {
    if (!this.props.value) return
    const { value, complete } = this.props
    const id = Date.now()
    this.props.saveTask({ id, value, complete })
  }

  handleToggleComplete (id, complete) {
    console.log('Complete', id)
    this.props.toggleCompleteStatus(id, !complete)
  }

  handleRemoveItem (key) {
    this.props.deleteTask(key)
  }

  renderRow (item) {
    return (
      <Row
        key={item.id}
        item={item}
        onComplete={complete => this.handleToggleComplete(item.id, complete)}
        onRemove={() => this.handleRemoveItem(item.id)}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Header onAddItem={this.handleAddingTask.bind(this)} />

        <View>
          <ListView
            style={styles.container}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={this.renderRow.bind(this)}
            renderSperator={(sectionId, rowId) => {
              return <View key={rowId} style={styles.separator} />
            }}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { id, complete, value, render, tasks, processing } = state.taskEntry
  console.log('Main ', value)
  return { id, complete, render, value, tasks, processing }
}

export default connect(mapStateToProps, {
  updateTask,
  saveTask,
  fetchTaskList,
  toggleCompleteStatus,
  deleteTask
})(Main)

const styles = {
  container: {
    paddingTop: 30,
    flexDirection: 'column'
  },
  content: {
    flex: 1,
    backgroundColor: 'black'
  },
  saparator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  },
  spinner: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
