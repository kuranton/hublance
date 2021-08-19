import zxcvbn from 'zxcvbn'

export const validatePassword = (password) => {
  const {feedback, score} = zxcvbn(password)
  const {suggestions} = feedback
  const warning = feedback.warning || 'Password is too weak'
  const passes = score >= 2
  if (passes) {
    return({passes})
  } else {
    return({passes, warning, suggestions})
  }
}
