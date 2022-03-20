import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { HtmlTooltip } from '../../HtmlTooltip';
import { selectOpening } from './scraperSlice';

type Props = {
  course: string,
};

export function OpenSameCondRecord(props: Props) {
  const { course: condition } = props;
  const { sameCondition } = useAppSelector(selectOpening);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography color='inherit'>{condition} 近似条件</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>レース</TableCell>
              <TableCell>馬名</TableCell>
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
            {sameCondition.map((record, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <HtmlTooltip title={
                      <>
                        <Typography color='inherit'>日付: {record.date}</Typography>
                        <Typography color='inherit'>天候: {record.weather}, 馬場: {record.baba}</Typography>
                        <Typography color='inherit'>開催: {record.track.replaceAll(/[0-9]/g, '')}</Typography>
                      </>
                    }>
                      <Button>{record.raceName}</Button>
                    </HtmlTooltip>
                  </TableCell>
                  <TableCell>
                    <HtmlTooltip title={
                      <>
                        <Typography>{record.waku}枠 {record.umaban}番</Typography>
                        <Typography>騎手: {record.jockey}</Typography>
                      </>
                    }>
                      <Button>{record.Horse.name}</Button>
                    </HtmlTooltip>
                  </TableCell>
                  <TableCell>{record.handicap}</TableCell>
                  <TableCell>{record.weight}</TableCell>
                  <TableCell>{record.finish}</TableCell>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>{record.halon}</TableCell>
                  <TableCell>{record.winner}</TableCell>
                  <TableCell>{record.passing}</TableCell>
                </TableRow> 
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}