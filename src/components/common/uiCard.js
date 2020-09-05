import React from 'react';
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
import UiButton from './uiButton.js';

const useStyles = makeStyles((theme) => ({
  root: { maxWidth: 'auto', margin: "20px 0px" },
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
  const useEffect = React.useEffect

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(props)
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        title={`${props.counter}. ${props.title}`}
        subheader={props.createdAt ? <>{props.createdAt.toDate().toString().slice(0, 24)}</> : null} >
      </CardHeader>

      <CardContent>
        <Typography variant="body2" align="justify" component="p">
          {expanded ? "======================"
            : <div>{props.body.slice(0, 200)}{props.additional}</div>}
        </Typography>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography align="justify" paragraph>
            {props.body}
          </Typography>
        </CardContent>
      </Collapse>

      {props.allowExpand &&
        <CardActions>
          <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded, })}
            onClick={handleExpandClick} aria-expanded={expanded} >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      }

      <span style={{ paddingLeft: 10, display: 'flex' }}>
        <UiButton variant="outlined" size="small" name="Update" function={() => props.updatePost(props.id, props.title, props.body)} />
        <UiButton variant="outlined" size="small" color="secondary" name="Delete" function={() => props.deletePost(props.id)} />

        <b style={{ marginLeft: "auto", marginTop: 8, paddingRight: 15 }}>id: {props.id}</b>
      </span>

    </Card >
  );
}