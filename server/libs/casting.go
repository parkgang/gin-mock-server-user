package libs

import (
	"strconv"
)

func ConvertStringToUint(data string) (uintData uint, err error) {
	u64, err := strconv.ParseUint(data, 10, 32)
	if err != nil {
		return 0, err
	}

	return uint(u64), nil
}
