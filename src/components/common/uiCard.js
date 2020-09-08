import React from 'react';
import marked from 'marked';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UiButton from './UiButton.js';
import 'github-markdown-css';
import Highlight from 'react-highlight';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles((theme) => ({
  root: { margin: "20px 0px" },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    margin: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  console.log("hello");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const markedbody = marked(props.body);
  const markedbodysliced = marked(props.body.slice(0, 200));
  
  return (
    <Card className={classes.root}>
      {/* Card Header Title, CreatedAt*/}
      <CardHeader
        title={`${props.counter}. ${props.title}`}
        subheader={props.createdAt ? <>{props.createdAt.toDate().toString().slice(0, 24)}</> : null} >
      </CardHeader>

      {/* Card Body Body */}
      <CardContent>
        <Typography align="justify" paragraph>
          {expanded && props.allowExpand ? <span style={{fontFamily:"Syne"}}>============EXPANDED============</span>
          : <Highlight innerHTML={true} className="markdown-body">{markedbodysliced}</Highlight>}
        </Typography>
      </CardContent>

      {/* Card Body if Expanded*/}
      <Collapse in={expanded && props.allowExpand} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="justify" paragraph>
            <Highlight className="markdown-body" innerHTML={true}>
              {markedbody}
            </Highlight>
          </Typography>
        </CardContent>
      </Collapse>

      {/* Button to expand the card*/}
      {props.allowExpand &&
        <CardActions>
          <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
            onClick={handleExpandClick} aria-expanded={expanded} >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      }

      {/* Button update and delete with id */}
      <span style={{ paddingLeft: 10, display: 'flex' }}>
        <UiButton variant="outlined" size="small" icon={<EditIcon/>} name="Update" function={() => props.updatePost(props.id, props.title, props.body)} />
        <UiButton variant="outlined" size="small" icon={<DeleteIcon/>} color="secondary" name="Delete" function={() => props.deletePost(props.id)} />
        <b style={{ marginLeft: "auto", marginTop: 8, paddingRight: 15 }}>id: {props.id}</b>
      </span>

    </Card >
  );
}
