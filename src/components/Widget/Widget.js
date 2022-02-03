import React, { useMemo } from 'react';
import styles from './Widget.module.css';
import DotPlotLabel from '../DotPlotLabel/DotPlotLabel';
import DotPlot from '../DotPlot/DotPlot';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

const Widget = ({ data, colConfig }) => {
    const colConfigByKey = useMemo(() => {
        const byKey = {};

        Object.values(colConfig).forEach((configItem) => {
            byKey[configItem.key] = configItem;
        });

        return byKey;
    }, [colConfig]);

    const { query: { headers, meta, data: queryData } } = data;

    const plotValues = [];

    const tableData = queryData.map((row, rowIndex) => {
        const rowData = [
            {
                isDefault: true,
                isPlot: false,
                value: meta[rowIndex].title,
                isShown: true,
            }
        ].concat(...row.map(({ k, v }, i) => {
            if (!plotValues[i]) {
                plotValues[i] = {
                     lowest: v,
                     highest: v,
                 };
            } else {
                plotValues[i].lowest = v < plotValues[i].lowest ? v : plotValues[i].lowest;
                plotValues[i].highest = v > plotValues[i].highest ? v : plotValues[i].highest;
            }

            const { prefix, suffix } = headers[i + 1];

            const { isHidden, showPlot, showValue } = colConfigByKey[k];

            return [
                {
                    columnKey: k,
                    prefix, 
                    suffix,
                    isPlot: false,
                    value: `${prefix || ''}${formatter.format(v)}${suffix || ''}`,
                    isShown: !isHidden && showValue,
                },
                {
                    columnKey: k,
                    prefix, 
                    suffix,
                    isPlot: true,
                    value: v,
                    isShown: !isHidden && showPlot,
                    plotValuesIndex: i,
                },
            ]
        }));

        return rowData;
    });

    return (
        <div className={styles.widget}>
           <table className={styles.widgetTable}>
                <thead>
                    <tr>
                    {
                        headers.map(({ key, title }, index) => {
                            const { isDefault, isHidden, showPlot, showValue } = colConfigByKey[key] ||  { isDefault: true };

                            if (isDefault) {
                                return (
                                    <th key={key}></th>
                                )
                            }

                            let colSpan = 0;
                            
                            if (!isHidden && showPlot) {
                                colSpan += 1;
                            }

                            if (!isHidden && showValue) {
                                colSpan += 1;
                            }

                            return (
                                <th key={key} colSpan={colSpan} className={isHidden ? styles.hidden : '' }>
                                    {title}
                                </th>
                            );
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((row, rowIndex) => {
                            const rows = [];
                            
                            if (rowIndex === 0) {
                                rows.push(
                                    <tr key="label">
                                    {
                                        row.map(({ isPlot, plotValuesIndex, isShown, prefix, suffix }, columnIndex) => {
                                            if (isPlot && isShown) {
                                                const { lowest, highest } = plotValues[plotValuesIndex];
                                                
                                                return (
                                                    <td className={`${styles.tableCell} ${styles.plotLabelCell}`} key={columnIndex}>
                                                        <DotPlotLabel 
                                                            lowest={`${prefix || ''}${formatter.format(lowest)}${suffix || ''}`} 
                                                            highest={`${prefix || ''}${formatter.format(highest)}${suffix || ''}`}
                                                        />
                                                    </td>
                                                )
                                            }

                                            return <td className={`${styles.tableCell} ${!isShown ? styles.hidden : '' }`}  key={columnIndex}></td>
                                        })
                                    }
                                    </tr>
                                )
                            }

                            rows.push(
                                <tr key={rowIndex}>
                                    {
                                        row.map(({ isDefault, isPlot, value, plotValuesIndex, isShown }, columnIndex) => {
                                            if (isPlot) {
                                                const { lowest, highest } = plotValues[plotValuesIndex];
                                                const percentage = Math.ceil((value - lowest) / (highest - lowest) * 100);

                                                return (
                                                    <td className={`${styles.tableCell} ${styles.plotCell} ${!isShown ? styles.hidden : '' }`} key={columnIndex}>
                                                        <div className={styles.plotCellContainer}>
                                                            <DotPlot percentage={percentage} />
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td 
                                                    className={`${styles.tableCell} ${!isShown ? styles.hidden : '' } ${styles.valueCell} ${isDefault ? styles.browserCell : ''}`} 
                                                    key={columnIndex} 
                                                >
                                                    <div className={isDefault ? styles.browserCellContent : ''}>
                                                        {value}
                                                    </div>
                                                    
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            )

                            return (
                                rows
                            );
                        })
                    }
                </tbody>
           </table>
        </div>
    )
}

export default React.memo(Widget);
