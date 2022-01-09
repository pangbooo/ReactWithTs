import styles from './index.module.scss';

// [ [10, red], [20, white], [70, blue]]
const sortArr = (arr: Array<[number, string]>) => arr.sort((a, b) => a[0] - b[0]);

function checkStatus(
  scope: Array<[number, string]>,
  val: number,
  defaultColor: string,
) {
  val = +val;
  sortArr(scope);

  if (scope.length === 1) {
    return val < scope[0][0] ? scope[0][1] : defaultColor;
  } else if (scope.length === 2) {
    return val < scope[0][0] ? scope[0][1]
      : scope[0][0] < val && val < scope[1][0] ? scope[1][1]
        : defaultColor;
  } else if (scope.length === 3) {
    return val < scope[0][0] ? scope[0][1]
      : scope[0][0] < val && val < scope[1][0] ? scope[1][1]
        : scope[1][0] < val && val < scope[2][0] ? scope[2][1]
          : defaultColor;
  }
}
type Props = {
  themeColor?: string,
  percent?: number,
  autoHidden?: boolean,
  hiddenText?: boolean,
  width?: number | string,
  textColor?: string,
  statusScope?: Array<[number, string]>, // 状态阈值,分别设置不同进度范围的进度条颜色,最大允许设置3个值, 为一个二维数组
};

export default function ProgressBar(props: Props) {
  const {
    themeColor = '#06f',
    percent = 0,
    autoHidden = false,
    hiddenText = false,
    width = 320,
    textColor = '#666',
    statusScope,
  } = props;

  return +percent === 100 && autoHidden
    ? null
    : (
            <div className={styles.progressWrap}>
                <div className={styles.progressBar} style={{ width: typeof width === 'number' ? width + 'px' : width }}>
                    <div className={styles.progressInnerBar}
                         style={{
                           width: `${percent}%`,
                           backgroundColor: statusScope && statusScope.length ? checkStatus(statusScope, percent, themeColor) : themeColor,
                         }}
                    >
                    </div>
                </div>
                {
                    !hiddenText && <div className={styles.progressText} style={{ color: textColor }}>{percent + '%'}</div>
                }
            </div>
    );
}
