import React from 'react'
import md5 from 'md5'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const Message = ({ message }) => (
  <Card className="mb-10">
    <CardHeader
      avatar={
        <Avatar src={`//0.gravatar.com/avatar/${md5(message.sender.uuid)}?s=70`} alt={message.sender.uuid} />
      }
      title={message.sender.uuid}
      subheader={(new Date(message.timetoken/10000)).toString()}
    />
    <CardContent>
      <Typography paragraph variant="body2">
        {message.data.text}
      </Typography>
    </CardContent>
  </Card>
)

export default Message