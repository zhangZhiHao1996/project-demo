import React, { Component } from 'react'
import {Card, List, Icon} from 'antd'
import {inject, observer} from 'mobx-react'
import css from './Project.module.less'

@inject('projectStore') @observer
class Project extends Component {

  async componentDidMount () {
    await this.props.projectStore.loadList()
  }

  render () {
    const {projectStore} = this.props
    return (
      <div className={css.container}>
        <Card bodyStyle={styles.cardBody}>
          <List grid={{ gutter: 16, column: 3 }}
                dataSource={projectStore.list.slice()}
                loading={projectStore.loading}
                renderItem={item => (
                  <List.Item>
                    {item.type === 0 ? <Add/> : <Content {...item}/>}
                  </List.Item>
                )}>
          </List>
        </Card>
      </div>
    )
  }
}

const Add = () => (
  <div className={css.add_button}>
    <Icon type={'plus'}/>新增项目
  </div>
)

const Content = ({id, name, imageUrl, businessUnitId, actualAmount}) => (
  <Card bodyStyle={{height: 160}} actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="delete" />]}>
    <Card.Meta
      avatar={(
        <div className={css.list_avatar}>
          <img src={imageUrl ? `${process.env.REACT_APP_API_URL}/b/file/${imageUrl}?h=80&w=80` : `https://www.gravatar.com/avatar/${businessUnitId}?d=identicon&s=80`}
               className={css.list_image} alt="avatar" />
        </div>
      )}
      title={name}
      description={(
        <div>
          <p>管理部门：businessUnitId</p>
          <p>项目金额：{actualAmount/100}</p>
        </div>
      )}
    />
  </Card>
)

const styles = {
  cardBody: {
    padding: '8px',
  },
}

export default Project