import React from 'react'
import Category from '../components/category'
import { connect } from 'react-redux'

class CateogriesContainer extends React.Component {

 

    renderCategories = () => {
        // sortedActivities = this.props.actvites.slice().sort((a, b) => b.date - a.date)
        return this.props.categories.map(category => <Category key={category.id} category={category} activities={this.props.activities.filter(activity => activity.category_id === category.id)}/>)
    }

    render() {
        return (
            <div className='category-container'> 
                {this.renderCategories()}
            </div>

        )
    }
}

const msp = state => {
    return {
        categories: state.categories,
        activities: state.activities
    }
}

export default connect(msp)(CateogriesContainer)