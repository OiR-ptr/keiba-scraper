import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Button, Collapse, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { selectOpening } from './scraperSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { HtmlTooltip } from '../../HtmlTooltip';

type RowProps = {
  index: number,
  entry: {
    waku: number,
    umaban: number,
    barei: string,
    handicap: number,
    weight: string,
    jockey: string,
    trainer: string,
    href: string,
    Horse: {
      name: string,
      sire: string,
      broodmare_sire: string,
      RaceResults: [
        {
          date: Date,
          raceName: string,
          course: string,
          weather: string,
          baba: string,
          track: string,
          waku: number,
          umaban: number,
          handicap: number,
          weight: string,
          jockey: string,
          finish: number,
          time: string,
          gap: string,
          halon: number,
          winner: string,
          passing: string,
          pace: string,
        }
      ],
    }
  }
};

function Row(props: RowProps) {
  const { index, entry } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow key={'p-' + index}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{entry.waku}</TableCell>
        <TableCell>{entry.umaban}</TableCell>
        <TableCell>
          <Tooltip title='netkeiba.com'>
            <Link href={entry.href} target='_blank' rel='noopener noreferrer'>
              <OpenInNewIcon />  
            </Link>
          </Tooltip>
          <HtmlTooltip title={
            <>
              <Typography color='inherit'>父: {entry.Horse.sire}</Typography>
              <Typography color='inherit'>母父: {entry.Horse.broodmare_sire}</Typography>
            </>
          }>
            <Button>{entry.Horse.name}</Button>
          </HtmlTooltip>
        </TableCell>
        <TableCell>{entry.barei}</TableCell>
        <TableCell>{entry.handicap}</TableCell>
        <TableCell>{entry.weight}</TableCell>
        <TableCell>{entry.jockey}</TableCell>
        <TableCell>{entry.trainer}</TableCell>
      </TableRow>

      <TableRow key={'c-' + index}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open}>
            <Box sx={{ margin: 1 }}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>レース</TableCell>
                    <TableCell>距離</TableCell>
                    <TableCell>斤量</TableCell>
                    <TableCell>体重</TableCell>
                    <TableCell>着順</TableCell>
                    <TableCell>時計</TableCell>
                    <TableCell>上り</TableCell>
                    <TableCell>一着(二着)</TableCell>
                    <TableCell>通過</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entry.Horse.RaceResults.map((horse, index) => {
                    return (
                      <TableRow key={'ch-' + index}>
                        <TableCell>
                          <HtmlTooltip title={
                            <>
                              <Typography color="inherit">日付: {horse.date}</Typography>
                              <Typography color="inherit">天候: {horse.weather}, 馬場: {horse.baba}</Typography>
                              <Typography color="inherit">開催: {horse.track.replaceAll(/[0-9]/g, '')}</Typography>
                            </>
                          }>
                            <Button>{horse.raceName}</Button>
                          </HtmlTooltip>
                        </TableCell>
                        <TableCell>{horse.course}</TableCell>
                        <TableCell>{horse.handicap}</TableCell>
                        <TableCell>{horse.weight}</TableCell>
                        <TableCell>
                          <HtmlTooltip title={
                            <>
                              <Typography color="inherit">{horse.waku}枠 {horse.umaban}番</Typography>
                              <Typography color="inherit">騎手: {horse.jockey}</Typography>
                            </>
                          }>
                            <Button>{horse.finish}</Button>
                          </HtmlTooltip>
                        </TableCell>
                        <TableCell>{horse.time}</TableCell>
                        <TableCell>{horse.halon}</TableCell>
                        <TableCell>{horse.winner}</TableCell>
                        <TableCell>{horse.passing}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export function OpenEntries() {
  const { raceCard } = useAppSelector(selectOpening);

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>枠</TableCell>
              <TableCell>番</TableCell>
              <TableCell>馬名</TableCell>
              <TableCell>馬齢</TableCell>
              <TableCell>斤量</TableCell>
              <TableCell>体重</TableCell>
              <TableCell>騎手</TableCell>
              <TableCell>厩舎</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {raceCard?.Entries?.map((entry, index) => {
              return <Row key={index} index={index} entry={entry} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}